const joi = require('joi');
const events_schema = joi.object({
    TITLE:joi.string().required(),
    START_DATE:joi.date().required(),
    END_DATE:joi.date().required(),
    VENUE:joi.string().required(),
    DESC:joi.string().required(),
    category_id:joi.string() .required(),
    NOTIFY_TIME:joi.date().required()
});

const event_category = joi.object({
    TITLE:joi.string().required()
})

module.exports = { events_schema, event_category}
