class PagesController < ApplicationController
  def home
    render layout: 'landing'
  end

  def programmation
    @programs = [
      {
        title: 'Lundi',
        content: [
          'Y a personne ! Vas sur <a href="https://www.youtube.com/channel/UC_k22kND7s8Nz7Kor3YyLdQ">YouTube</a> !'
        ],
      },
      {
        title: 'Mardi',
        content: [
          'Y a personne ! Vas sur <a href="https://www.youtube.com/channel/UC_k22kND7s8Nz7Kor3YyLdQ">YouTube</a> !'
        ],
      },
      {
        title: 'Mercredi',
        content: [
          'Y a personne ! Vas sur <a href="https://www.youtube.com/channel/UC_k22kND7s8Nz7Kor3YyLdQ">YouTube</a> !'
        ],
      },
      {
        title: 'Jeudi',
        content: [
          'Y a personne ! Vas sur <a href="https://www.youtube.com/channel/UC_k22kND7s8Nz7Kor3YyLdQ">YouTube</a> !'
        ],
      },
      {
        title: 'Vendredi',
        content: [
          'Y a personne ! Vas sur <a href="https://www.youtube.com/channel/UC_k22kND7s8Nz7Kor3YyLdQ">YouTube</a> !'
        ],
      },
      {
        title: 'Samedi',
        content: [
          'Y a personne ! Vas sur <a href="https://www.youtube.com/channel/UC_k22kND7s8Nz7Kor3YyLdQ">YouTube</a> !'
        ],
      },
      {
        title: 'Dimanche',
        content: [
          'Y a personne ! Vas sur <a href="https://www.youtube.com/channel/UC_k22kND7s8Nz7Kor3YyLdQ">YouTube</a> !'
        ],
      },
    ]
  end
end
