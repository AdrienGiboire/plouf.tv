class PagesController < ApplicationController
  def home
    render layout: 'landing'
  end

  def programmation
    @programs = [
      {
        title: 'Lundi',
        content: [
        ],
      },
      {
        title: 'Mardi',
        content: [],
      },
      {
        title: 'Mercredi',
        content: [
          '<strong>20h30 :</strong> Cast HL Div 4 Team Simple Geography vs PCS-Cronos',
        ],
      },
      {
        title: 'Jeudi',
        content: [
          '<strong>21h30 :</strong> Cast HL Div 3 J\'AI PLUS DE FORCE vs Jormungandr White',
          # '<strong>19h-23h :</strong> Vieilleries mais bonneries',
          # "On remonte le temps et on joue à des jeux qui m'ont bercés même si je ne rentrais déjà plus dans un berceau quand j'ai commencé à jouer.",
        ]
      },
      {
        title: 'Vendredi',
        content: [
          '<strong>20h30 :</strong> Cast HL Div 3 EterelZ vs Sauna Tent',
        ]
      },
      {
        title: 'Samedi',
        content: [
        ]
      },
      {
        title: 'Dimanche',
        content: [
          # '<strong>20h à 00h :</strong> Steam Roulette',
          # 'Session gampelay d\'un jeu ou deux, issus de ma librairie Steam'
        ]
      },
    ]
  end
end
