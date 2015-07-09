module Api
  class Api::EventsController < ApiController
    before_action :require_current_user
    before_action :require_coordinator, only: [:update, :destroy]

    def index
      if params[:search]
        @events = Event.includes(:attendees).search_for(params[:search][:event])
      else
        @events = Event.includes(:attendees).where("date > ?", Time.now).order(:date)
      end
        @events.each do |event|
          event.num_attendees = event.attendees.length
        end
    end

    def show
      @event = Event.includes(:flocks, :coordinator, :attendees).find(params[:id])
      @event.num_attendees = @event.attendees.length
      @event.flocks.each do |flock|
        flock.num_attendees = flock.attendees.length
      end
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
      @event = Event.find(params[:id])
      unless current_user.id == @event.coordinator_id
        render json: ["You must be the flock coordinator to perform that action"],
                      status: :unauthorized
      end
    end

    def event_params
      params.require(:event).permit(
        :title, :description, :location,
        :date, :coordinator_id, :url, :img_url)
    end
  end
end
