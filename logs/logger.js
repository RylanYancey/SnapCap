
const fs = require('fs')

async function update_template_count(meme_name) {
    fs.readFile('./logs/tracker.json', 'utf8', function (err, data) {
        if (err) console.log(err)
        data = JSON.parse(data)
        data[meme_name]++
        data = JSON.stringify(data, undefined, 4);
        fs.writeFile('./logs/tracker.json', data, function (err) {
            if (err) console.log(err)
        })
    })
}

module.exports = {
    update_template_logs: update_template_count
}
