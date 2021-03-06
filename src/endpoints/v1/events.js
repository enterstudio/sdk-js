/*

*/

import {_} from "../../utils"

import {Result, ResultSet} from "../../resultset"

import {EventSchema} from "./schemas"

import BaseEndpoint from "../base"

class EventResultSet extends ResultSet { }
class EventCountResult extends Result { }
class CalendarResultSet extends ResultSet { }
class SavedSearchResultSet extends ResultSet { }

class Events extends BaseEndpoint {

    constructor(client, accountId){

        super(client)

        this.schema = EventSchema
        this.arrayOptions = ['category', 'sort', 'top_events.sort', 'rank_level', 'label', 'country','place.scope','place.exact']
        this.integerOptions = ['limit', 'offset', 'rank_level']

        this.accountId = accountId

    }

    search(options){

        options = options || {}

        let validate = this.validate(options)

        if (validate.valid) {
            return this.get('v1', '/events/', EventResultSet, options)
        }

        return new Promise((resolve, reject) => {
            return reject(validate.errors[0])
        })

    }

    count(options){

        options = options || {}

        let validate = this.validate(options)

        if (validate.valid) {
            return this.get('v1', '/events/count/', EventCountResult, options)
        }

        return new Promise((resolve, reject) => {
            return reject(validate.errors[0])
        })

    }

    calendar(options){

        options = options || {}

        let validate = this.validate(options)

        if (validate.valid)
            return this.get('v1','/events/calendar/', CalendarResultSet, options)

        return new Promise((resolve, reject) => {
            return reject(validate.errors[0])
        })

    }

    for_account(id){
        return new Events(this.client, id)
    }

}

export default Events