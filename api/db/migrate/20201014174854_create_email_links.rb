class CreateEmailLinks < ActiveRecord::Migration[5.2]
  def change
    create_table :email_links, id: :uuid do |t|
      t.string :token
      t.datetime :expires_at
      t.references :user, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
