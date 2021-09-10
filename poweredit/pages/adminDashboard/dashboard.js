let hoveredProject = null
let hoveredPage = null

let projectSet = {}

let selectedProject = ''
let pagesNeedsUpdate = true

let workingProject = ''
let originalName = ''

const sitesTableConfig = {
    //data: ---
    autoColumns: true,
    height: '100%',
    placeholder: 'no data available',
    layout: "fitColumns",
    movableRows: false,
    resizableRows: false,
    resizableColumns: false,
    selectable: 1,
    selectableRollingSelection: true,

    autoColumnsDefinitions:[
        {
            title: 'NAME',
            field: 'name'
        },{
            title: 'URL',
            field: 'url',
        },{
            title: 'LIVE',
            field: 'live',
            hozAlign: 'center',
            width: 90,
            editor: true,

            formatter: function (cell, fParams) {
                if (cell.getValue()) {
                    return '<i class="fas fa-check green"></i>'
                } else {
                    return '<i class="fas fa-times red"></i>'
                }
            },

            cellClick: function (e, cell) {
                let value = !cell.getValue()

                fetch(window.location.origin + '/api/projects/live', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        projectid: projectSet[hoveredProject._row.data['name']],
                        value: value
                    })
                })
                .then(response => response.json())
                .then(res => {
                    if (res.status == 'success') {
                        cell.setValue(value)
                    } else {
                        alert('couldnt update site')
                    }
                })
            }
        },{
            title: 'EDIT',
            field: 'edit',
            width: 65,
            hozAlign: 'center',
            headerSort: false,

            formatter: function (cell, fParams) {
                return '<i class="fas fa-edit blue"></i>'
            },

            cellClick: function (e, cell) {
                document.querySelector('.modalCover').style.display = 'flex'

                document.querySelector('.editProjectModalError').style.display = 'none'

                document.querySelector('#editProjectNameField').value = hoveredProject._row.data['name']
                document.querySelector('#editProjectUrlField').value = hoveredProject._row.data['url']

                document.querySelector('.EditProjectModal').style.display = 'block'
                document.querySelector('.AddProjectModal').style.display = 'none'

                document.querySelector('.EditPageModal').style.display = 'none'
                document.querySelector('.AddPageModal').style.display = 'none'

                workingProject = projectSet[hoveredProject._row.data['name']]
                originalName = hoveredProject._row.data['name']
            }
        },{
            title: 'DELETE',
            field: 'delete',
            width: 90,
            hozAlign: 'center',
            headerSort: false,

            formatter: function (cell, fParams) {
                return '<i class="far fa-trash-alt red"></i>'
            },

            cellClick: function (e, cell) {
                let confirm = window.confirm('Are you sure you want to delete ' + hoveredProject._row.data['name'] + '?')
                if (confirm) {
                    fetch(window.location.origin + '/api/projects/delete', {
                        method: 'POST',
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ projectName: hoveredProject._row.data['name'] })
                    })
                    .then(response => response.json())
                    .then(res => {
                        let status = res.status

                        if (status == 'success') {
                            refreshData()
                        } else if (status == 'error') {
                            alert('there was a server error')
                        }
                    })
                }
            }
        }
    ],

    rowMouseEnter: function (e, row) {
        hoveredProject = row
    },

    rowMouseLeave: function (e, row) {
        hoveredProject = null
    },

    rowClick: function(e, row){
        let projectid = projectSet[hoveredProject._row.data['name']]
        if (selectedProject != projectid) {
            selectedProject = projectid
        } else {
            selectedProject = ''
        }
        pagesNeedsUpdate = true
    }
}

const pagesTableConfig = {
    //data: ---
    autoColumns: true,
    height: '100%',
    placeholder: 'no data available',
    layout: "fitColumns",
    movableRows: false,
    resizableRows: false,
    resizableColumns: false,
    selectable: false,
    selectableRollingSelection: true,

    autoColumnsDefinitions: [
        {
            title: 'NAME',
            field: 'name'
        },{
            title: 'LOCATION',
            field: 'location'
        },{
            title: 'ACTIVE',
            field: 'active',
            hozAlign: 'center',
            width: 120,
            editor: true,

            formatter: function (cell, fParams) {
                if (cell.getValue()) {
                    return '<i class="fas fa-check green"></i>'
                } else {
                    return '<i class="fas fa-times red"></i>'
                }
            },

            cellClick: function (e, cell) {
                let value = !cell.getValue()

                fetch(window.location.origin + '/api/sites/active', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        projectid: selectedProject,
                        name: hoveredPage._row.data['name'],
                        value: value
                    })
                })
                .then(response => response.json())
                .then(res => {
                    if (res.status == 'success') {
                        cell.setValue(value)
                    } else {
                        alert('couldnt update page')
                    }
                })
            }
        },{
            title: 'EDIT',
            field: 'edit',
            width: 65,
            hozAlign: 'center',
            headerSort: false,

            formatter: function (cell, fParams) {
                return '<i class="fas fa-edit blue"></i>'
            },

            cellClick: function (e, cell) {
                document.querySelector('.modalCover').style.display = 'flex'

                document.querySelector('.editPageModalError').style.display = 'none'

                document.querySelector('#editPageNameField').value = hoveredPage._row.data['name']
                document.querySelector('#editPageLocationField').value = hoveredPage._row.data['location']

                document.querySelector('.EditProjectModal').style.display = 'none'
                document.querySelector('.AddProjectModal').style.display = 'none'

                document.querySelector('.EditPageModal').style.display = 'block'
                document.querySelector('.AddPageModal').style.display = 'none'

                originalName = hoveredPage._row.data['name']
            }
        },{
            title: 'DELETE',
            field: 'delete',
            width: 90,
            hozAlign: 'center',
            headerSort: false,

            formatter: function (cell, fParams) {
                return '<i class="far fa-trash-alt red"></i>'
            },

            cellClick: function (e, cell) {
                let confirm = window.confirm('Are you sure you want to delete ' + hoveredPage._row.data['name'] + '?')
                if (confirm) {
                    fetch(window.location.origin + '/api/sites/delete', {
                        method: 'POST',
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            projectid: selectedProject,
                            name: hoveredPage._row.data['name']
                        })
                    })
                    .then(response => response.json())
                    .then(res => {
                        let status = res.status

                        if (status == 'success') {
                            refreshData()
                        } else if (status == 'error') {
                            alert('there was a server error')
                        }
                    })
                }
            }
        }
    ],

    rowMouseEnter: function (e, row) {
        hoveredPage = row
    },

    rowMouseLeave: function (e, row) {
        hoveredPage = null
    },
}

let contentTable = null

let selectedTab = 'SITES'
function selectHeadTab (tab) {
    if (tab.innerHTML != selectedTab) {
        document.querySelector(`.${selectedTab}`).classList.remove('selectedTab')
        tab.classList.add('selectedTab')
        selectedTab = tab.innerHTML
    }

    if (selectedTab == 'SITES') {
        document.querySelector('.tableSITES').style.display = ''
        document.querySelector('.tablePAGES').style.display = 'none'

        document.querySelector('.settingsWrapper').style.display = 'none'

        document.querySelector('.controlsWrapper').style.display = 'flex'
    } else if (selectedTab == 'PAGES') {
        if (selectedProject == '') {
            document.querySelector('.controlsWrapper').style.display = 'none'
        } else {
            document.querySelector('.controlsWrapper').style.display = 'flex'
        }

        document.querySelector('.tableSITES').style.display = 'none'
        document.querySelector('.tablePAGES').style.display = ''

        document.querySelector('.settingsWrapper').style.display = 'none'

        if (pagesNeedsUpdate) {
            refreshData()
            pagesNeedsUpdate = false
        }
    } else {
        document.querySelector('.tableSITES').style.display = 'none'
        document.querySelector('.tablePAGES').style.display = 'none'

        document.querySelector('.settingsWrapper').style.display = 'block'

        document.querySelector('.controlsWrapper').style.display = 'none'
    }
}

function refreshData () {
    if (selectedTab == 'SITES') {
        projectSet = {}

        fetch(window.location.origin + '/api/projects/get', {
            method: 'POST',
            credentials: 'include',
        })
        .then(response => response.json())
        .then(res => {
            let data = res.data
            if (data) {
                data.forEach(project => {
                    if (project.live == 0) {
                        project.live = false
                    } else {
                        project.live = true
                    }

                    project.edit = null
                    project.delete = null

                    projectSet[project.name] = project.projectid

                    delete project.projectid
                    delete project.hasIndex
                })
                sitesTableConfig.data = data
                contentTable = new Tabulator('.tableSITES', sitesTableConfig)
            } else {
                delete sitesTableConfig.data
                contentTable = new Tabulator('.tableSITES', sitesTableConfig)
            }
        })

        pagesNeedsUpdate = true
        selectedProject = ''
    } else if (selectedTab == 'PAGES') {
        if (selectedProject == '') {
            delete pagesTableConfig.data
            contentTable = new Tabulator('.tablePAGES', pagesTableConfig)

            document.querySelector('.controlsWrapper').style.display = 'none'

            return
        }

        //{ name: 'pageName', location: '/ext1/ext2', active: false, edit: null, delete: null }

        if (selectedProject != '') {
            fetch(window.location.origin + '/api/sites/get', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    projectid: selectedProject
                })
            })
            .then(response => response.json())
            .then(res => {
                let data = res.data

                if (data) {
                    data.forEach(site => {
                        if (site.active == 0) {
                            site.active = false
                        } else {
                            site.active = true
                        }
    
                        site.edit = null
                        site.delete = null

                        pagesTableConfig.data = data
                        contentTable = new Tabulator('.tablePAGES', pagesTableConfig)
                    })
                } else {
                    delete pagesTableConfig.data
                    contentTable = new Tabulator('.tablePAGES', pagesTableConfig)
                }
            })
        } else {
            delete pagesTableConfig.data
            contentTable = new Tabulator('.tablePAGES', pagesTableConfig)
        }
    }
}

function openAddModal () {
    if (selectedTab == 'SITES') {
        document.querySelector('.modalCover').style.display = 'flex'

        document.querySelector('.addProjectModalError').style.display = 'none'

        document.querySelector('#addProjectNameField').value = ''
        document.querySelector('#addProjectUrlField').value = ''

        document.querySelector('.EditProjectModal').style.display = 'none'
        document.querySelector('.AddProjectModal').style.display = 'block'

        document.querySelector('.EditPageModal').style.display = 'none'
        document.querySelector('.AddPageModal').style.display = 'none'
    } else if (selectedTab == 'PAGES') {
        document.querySelector('.modalCover').style.display = 'flex'

        document.querySelector('.addPageModalError').style.display = 'none'

        document.querySelector('#addPageNameField').value = ''
        document.querySelector('#addPageLocationField').value = ''

        document.querySelector('.EditProjectModal').style.display = 'none'
        document.querySelector('.AddProjectModal').style.display = 'none'

        document.querySelector('.EditPageModal').style.display = 'none'
        document.querySelector('.AddPageModal').style.display = 'block'
    }
}

refreshData()

function addProject () {
    let projectName = document.querySelector('#addProjectNameField').value
    let projectUrl = document.querySelector('#addProjectUrlField').value

    if (projectName.trim() == '') {
        let error = document.querySelector('.addProjectModalError')
        error.innerHTML = 'PROJECT NAME IS EMPTY'
        error.style.display = 'flex'
    } else {
        fetch(window.location.origin + '/api/projects/add', {
            method: 'POST',
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: projectName,
                url: projectUrl
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                let errorMsg = document.querySelector('.addProjectModalError')
                errorMsg.innerHTML = data.error
                errorMsg.style.display = 'flex'
            } else if (data.status == 'success') {
                removeModal()
                refreshData()
            } else {
                let errorMsg = document.querySelector('.addProjectModalError')
                errorMsg.innerHTML = 'ADD PROJECT FAILED'
                errorMsg.style.display = 'flex'
            }
        })
    }
}

function editProject () {
    let projectName = document.querySelector('#editProjectNameField').value
    let projectUrl = document.querySelector('#editProjectUrlField').value

    if (projectName.trim() == '') {
        let error = document.querySelector('.editProjectModalError')
        error.innerHTML = 'PROJECT NAME IS EMPTY'
        error.style.display = 'flex'

        return
    }

    fetch(window.location.origin + '/api/projects/edit', {
        method: 'POST',
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            projectid: workingProject,
            name: projectName,
            url: projectUrl
        })
    })
    .then(response => response.json())
    .then(res => {
        let status = res.status
        if (status == 'success') {
            removeModal()
            refreshData()
        } else {
            alert('server error')
        }
    })
}

function addPage () {
    let siteName = document.querySelector('#addPageNameField').value
    let siteLocation = document.querySelector('#addPageLocationField').value

    if (siteName.trim() == '') {
        let error = document.querySelector('.addPageModalError')
        error.innerHTML = 'PAGE NAME IS EMPTY'
        error.style.display = 'flex'
    } else {
        fetch(window.location.origin + '/api/sites/add', {
            method: 'POST',
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                projectid: selectedProject,
                name: siteName,
                location: siteLocation
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                let error = document.querySelector('.addPageModalError')
                error.innerHTML = data.error
                error.style.display = 'flex'
            } else if (data.status = 'success') {
                removeModal()
                refreshData()
            } else {
                let error = document.querySelector('.addPageModalError')
                error.innerHTML = 'ADD PAGE FAILED'
                error.style.display = 'flex'
            }
        })
    }
}

function editPage () {
    let pageName = document.querySelector('#editPageNameField').value
    let pageLocation = document.querySelector('#editPageLocationField').value

    if (pageName.trim() == '') {
        let error = document.querySelector('.editPageModalError')
        error.innerHTML = 'PAGE NAME IS EMPTY'
        error.style.display = 'flex'

        return
    }

    fetch(window.location.origin + '/api/sites/edit', {
        method: 'POST',
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            projectid: selectedProject,
            originalname: originalName,
            name: pageName,
            location: pageLocation
        })
    })
    .then(response => response.json())
    .then(res => {
        let status = res.status
        if (status == 'success') {
            removeModal()
            refreshData()
        } else {
            alert('server error')
        }
    })
}

function openEditor () {
    fetch(window.location.origin + '/api/editor/set', {
        method: 'POST',
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            projectid: selectedProject,
            name: originalName,
        })
    })
    .then(response => response.json())
    .then(res => {
        window.location.href = window.location.origin + '/editor'
    })
}

function removeModal () {
    document.querySelector('.modalCover').style.display = 'none'
}

function changeLogin () {
    let usernameField = document.querySelector('#UsernameField').value
    let oldPasswordField = document.querySelector('#OldPasswordField').value
    let newPasswordField = document.querySelector('#NewPasswordField').value

    fetch(window.location.origin + '/api/auth/update', {
        method: 'POST',
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: usernameField,
            oldPassword: oldPasswordField,
            newPassword: newPasswordField
        })
    })
    .then(response => response.json())
    .then(res => {
        clearFields()

        if (res.error) {
            alert('invalid credentials')
        } else {
            alert('credentials updated, please restart server if you wish for auth cookies to be updated')
        }
    })

    function clearFields () {
        document.querySelector('#UsernameField').value = ''
        document.querySelector('#OldPasswordField').value = ''
        document.querySelector('#NewPasswordField').value = ''
    }
}