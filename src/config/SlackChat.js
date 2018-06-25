import request from 'superagent'
import moment, { now } from 'moment'

export default {
    slackPost(nickname, num, date) {
        const day = moment(date).format('LL');
        const nick = nickname
        const text =
            (
                `mrkdwn = true`,
                `text= *Today ${day}* \n *${nick}* is taking an *OnCall0${num}* ` ,
                'username = sretthakan.t',
                'bot = oncall'        
            )
        request.post('https://slack.com/api/chat.postMessage')
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send('token=xoxb-360083493237-384365618711-2icVB5gT7OFa3BCU8MovFpGD')
        .send('channel=who-is-oncall')
        .send(`${text}`)
        .then(e => {
            console.log(e)
        })
        .catch(e => {
            console.log(e)
        })
    }
}