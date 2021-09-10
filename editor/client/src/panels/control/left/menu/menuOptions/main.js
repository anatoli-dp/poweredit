export function main (editor) {
    editor.on('main:publish', function () {
        editor.StorageManager.store()

        fetch(window.location.origin + '/api/editor/publish', {
            method: 'POST',
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        })
        .then(response => response.json())
        .then(res => {
            if (res.error) {
                alert('failed to publish page')
            } else {
                alert('page published')
            }
        })
    })

    editor.on('main:dashboard', function () {
        if (confirm('Save changes and go back to dashboard page?')) {
            editor.trigger('main:store')
            window.location.href = window.location.origin + '/dashboard'
        }
    })
}