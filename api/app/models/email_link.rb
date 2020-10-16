class EmailLink < ApplicationRecord
  belongs_to :user
  after_create :send_mail

  def self.generate(email)
    user = User.find_by(email: email)
    return nil if !user

    create(user: user, expires_at: Date.today + 1.day, token: generate_token(user))
  end

  def self.generate_token(user)
    AuthToken.encode(user_id: user.id)
  end

  private
  def send_mail
    mailer = EmailLinkMailer.sign_in_mail(self)
    mailer.deliver_now
  end
end