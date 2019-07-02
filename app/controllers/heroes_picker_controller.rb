class HeroesPickerController < ApplicationController
  def index
    @heroes = HotsAPI::Heroes.get.sort { |a, b| a['name'] <=> b['name'] }
  end
end
