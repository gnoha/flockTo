module Api
  class Api::FlocksController < ApiController
    before_action :require_current_user
    before_action :require_coordinator, only: [:update, :destroy]

    def index
      @flocks = Flock.all
    end

    def show
      @flock = Flock.find(params[:id])
    end

    def create
      @flock = Flock.new(flock_params)
      if @flock.save
        render json: @flock
      else
        render json: @flock.errors.full_messages, status: :unproccessable_entity
      end
    end

    def update
      @flock = Flock.find(params[:id])

      if @flock.update(flock_params)
        render :show
      else
        render json: @flock.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @flock = Flock.find(params[:id])
      @flock.destroy()
      render json: {}
    end

    def find_nearbys
      event_flocks = Flock.where({ event_id: params[:event_id] })
      @search_location = params[:current_location]
      @nearby_flocks = event_flocks.near(@search_location, params[:distance])


      render :nearby_flocks
    end

    private

    def require_coordinator
      @flock = Flock.find(params[:id])
      unless current_user.id == @flock.coordinator_id
        render json: ["You must be the flock coordinator to perform that action"],
               status: :unauthorized
      end
    end

    def flock_params
      params.require(:flock).permit(:title, :description, :location, :date,
                                    :event_id, :parent_id, :coordinator_id)
    end
  end
end
