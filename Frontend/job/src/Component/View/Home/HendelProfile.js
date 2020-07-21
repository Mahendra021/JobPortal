import React from 'react'
import { createBrowserHistory } from 'history'

var history = createBrowserHistory()

export function hendelprofile(id) {
    
    history.push("/jobseeker/profile/?id="+ id)
    window.location.reload()

}
