class User < ApplicationRecord
    has_secure_password

    has_many :journal_entries

    def sub_categories
        entries = self.journal_entries
        entries.map do |entry|
            entry.sub_category
        end.uniq
    end

    def journal_entries_short
        self.journal_entries.pluck(:id, :amount, :note, :created_at)
    end
end
