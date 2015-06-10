class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :signed_in?

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def sign_in(user)
    @current_user = user
    session[:session_token] = user.reset_token!
    redirect_to root_url
  end

  def signed_in?
    !!current_user
  end

  def sign_out
    current_user.try(:reset_token!)
    session[:session_token] = nil
  end

  def require_current_user
    redirect_to new_session_url unless signed_in?
  end

end
