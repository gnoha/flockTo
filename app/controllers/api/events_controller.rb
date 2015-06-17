module Api
  class Api::EventsController < ApiController
    before_action :require_current_user
    before_action :require_coordinator, only: [:update, :destroy]

    def index
      if params[:search]
        @events = Event.search_for(params[:search][:event])
      else
        @events = Event.all.order(:date)
      end
    end

    def show
      @event = Event.find(params[:id])
    end

    def create
      @event = Event.new(event_params)
      if @event.save
        render json: @event
      else
        render json: @event.errors.full_messages, status: :unprocessable_entity
      end
    end

    def update
      @event = Event.find(params[:id])
      if @event.update(event_params)
        render :show
      else
        render json: @event.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @event = Event.find(params[:id])
      @event.destroy
      render json: {}
    end

    private

    def require_coordinator
      @flock = Flock.find(params[:id])
      unless current_user.id == @flock.coordinator_id
        render json: ["You must be the flock coordinator to perform that action",
                      status: :unauthorized]
      end
    end

    def event_params
      params.require(:event).permit(
        :title, :description, :location,
        :date, :coordinator_id)
    end
  end
end
