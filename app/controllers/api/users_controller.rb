class Api::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def update
    @user = User.find(params[:id])
    if current_user = @user
      @user.update(user_params)
    else
      render json: 
    end
  end
end
