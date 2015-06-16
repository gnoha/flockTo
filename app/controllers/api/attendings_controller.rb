module Api
  class Api::AttendingsController < ApiController
    def create
      @attending = current_user.attendings.new( flock_id: params[:data][:attending][:flock_id] })
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
  end
end
