export const campaignConstraints = {
    advertiser_id: {
        presence: { allowEmpty: false, message: "^Advertiser ID is required" },
        numericality: {
            onlyInteger: true,
            greaterThan: 0,
            message: "^Advertiser ID must be a positive integer",
        },
    },
    title: {
        presence: { allowEmpty: false, message: "^Campaign title is required" },
        length: {
            minimum: 5,
            maximum: 100,
            tooShort: "^Campaign title must be at least %{count} characters",
            tooLong: "^Campaign title must be at most %{count} characters",
        },
    },
    landing_page_url: {
        presence: { allowEmpty: false, message: "^Landing Page URL is required" },
        url: { message: "^Please enter a valid URL" },
    },
    payouts: {
        presence: { allowEmpty: false, message: "^At least one payout is required" },
        type: "array",
        length: {
            minimum: 1,
            message: "^At least one payout is required",
        },
    },
    "payouts.*.country": {
        presence: { allowEmpty: false, message: "^Country is required" },
        inclusion: {
            within: ["Estonia", "Spain", "Bulgaria"],
            message: "^Country must be one of %{values}",
        },
    },
    "payouts.*.payout_value": {
        presence: { allowEmpty: false, message: "^Payout value is required" },
        numericality: {
            greaterThanOrEqualTo: 0,
            message: "^Payout value must be a positive number",
        },
    },
};
