module Api
  class Api::AttendingsController < ApiController
    def create
      @attending = current_user.attendings.new(attending_params);
      if @attending.save
        render json: {}
      else
        render json: @attending.errors.full_messages,
               status: :unprocessable_entity
      end
    end

    def index
      @attending = Attending.find_by_pair(current_user.id,
                                          params[:attending][:flock_id])
      render json: @attending
    end

    def destroy
      @attending = Attending.find(params[:id])
      @attending.destroy
      render json: {}
    end

    private

    def attending_params
      params.require(:attending).permit(:user_id, :flock_id)
    end
  end
end
