class HeroesPickerController < ApplicationController
  def index
    @heroes = HotsApi.heroes.to_a.sort { |a, b| a.name <=> b.name }
  end
end
