class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :define_menu_items

private

  def define_menu_items
    @items = {
      internal_links: [
        ['/programmation', 'Programmation'],
        #['/salty_ranked', 'Classée Salée'],
      ],
      socials: [
        ['https://twitter.com/plouftv', :twitter],
        ['https://www.youtube.com/channel/UC_k22kND7s8Nz7Kor3YyLdQ', :youtube],
        ['https://www.facebook.com/PloufTV/', :facebook],
        ['https://www.twitch.tv/plouf/', :twitch],
      ],
    }
  end

protected

  def after_sign_in_path_for(resource)
    request.env['omniauth.origin'] || stored_location_for(resource) || salty_ranked_path
  end
end
