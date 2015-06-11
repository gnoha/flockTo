module Api
  class Api::EventsController < ApplicationController
    def index
      @events = Event.all
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

    def destroy
      @event = Event.find(params[:id])
      @event.destroy
      render json: {}
    end

    private

    def event_params
      params.require(:event).permit(:title, :description, :date)
    end
  end
end
