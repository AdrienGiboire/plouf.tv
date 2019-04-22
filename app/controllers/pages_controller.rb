class PagesController < ApplicationController
  def home
    render layout: 'landing'
  end

  def programmation
    @programs = [
      {
        title: 'Lundi',
        content: [
          '<strong>20h-00h :</strong> Découverte Inked',
          'https://youtu.be/X08L9kau-Kw'
        ],
      },
      {
        title: 'Mardi',
        content: [],
      },
      {
        title: 'Mercredi',
        content: [
          '<strong>20h :</strong> Cast HL Div 3 Trait Value vs Sauna Tent',
          '<strong>21h15 :</strong> Cast HL Div 4 PCS-Cronos vs Team Moon Moon',
        ],
      },
      {
        title: 'Jeudi',
        content: [
          '<strong>19h :</strong> Cast HL Div 3 ProNubs vs Superfreunde Squad',
          '<strong>21h :</strong> Cast HL Div 5 The Sops vs MortSure',
          # '<strong>19h-23h :</strong> Vieilleries mais bonneries',
          # "On remonte le temps et on joue à des jeux qui m'ont bercés même si je ne rentrais déjà plus dans un berceau quand j'ai commencé à jouer.",
        ]
      },
      {
        title: 'Vendredi',
        content: [
          '<strong>19h30 :</strong> Cast HL Div 4 Lost in Draft BTW vs The Art of Warfare',
          '<strong>21h :</strong> Cast HL Div 2 Mondial Murky Oblivion Real Pro Gamer vs Dragon\'s Nest Community',
        ]
      },
      {
        title: 'Samedi',
        content: [
          '<strong>20h15 :</strong> Cronos Rumble 12ème édition',
        ]
      },
      {
        title: 'Dimanche',
        content: [
          '<strong>20h :</strong> Cast HL Div 1 Agnostic About Minion Genocide vs FieryTale',
          '<strong>23h :</strong> Cast HL Div SnowStorm vs Without Origins',
        ]
      },
    ]
  end
end
