class CreateJournalEntries < ActiveRecord::Migration[6.1]
  def change
    create_table :journal_entries do |t|
      t.integer :amount
      t.string :note
      t.datetime :date
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :sub_category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
