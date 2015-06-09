class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by_credentials(
            params[:user][:username],
            params[:user][:password]
    )

    if @user
      sign_in(@user)
      render json: 'redirect'
    else
      flash.now[:errors] = ["Invalid Username Or Password"]
      render :new
    end
  end

  def destroy
    sign_out(@user)
    redirect_to new_session_url
  end
end
