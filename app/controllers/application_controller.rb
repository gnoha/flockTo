class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :require_current_user, except: [:create, :new]

  helper_method :current_user, :signed_in?

  def current_user
    current_session = Session.find_by(session_token: session[:session_token])
    if current_session.nil?
      @current_user = nil
    else
      @current_user ||= User.find(current_session.user_id)
    end

    @current_user
  end

  def sign_in(user)
    @current_user = user
    session[:session_token] = user.add_token!
  end

  def signed_in?
    !!current_user
  end

  def sign_out
    current_user.try(:remove_token, session[:session_token])
    session[:session_token] = nil
  end

  def require_current_user
    redirect_to new_session_url unless signed_in?
  end
end
