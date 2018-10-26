module ApplicationHelper
  def is_current_path path
    path == request.path
  end
end
