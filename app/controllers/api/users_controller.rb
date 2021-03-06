module Api
  class Api::UsersController < ApiController
    before_action :require_current_user
    def show
      @user = User.find(params[:id])
      @user.events
    end

    def update
      @user = User.find(params[:id])
      if current_user = @user
        @user.update(user_params)
        render :show
      else
        render json: @user.errors.full_messages, status: :unprocessable_entity
      end
    end

    private

    def user_params
      params.require(:user).permit(:bio);
    end
  end
end
