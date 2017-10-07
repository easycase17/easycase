Template.Pagination.helpers({
    pagination: () => {
        var res = '';
        var numPages = Template.currentData().numPages;
        var curPage =  Template.currentData().page;
        // go-left button
        if (curPage <= 1) {
            res += '<li class="disabled"><i class="fa fa-chevron-left"></i></li>';
        } else {
            res += '<li class="page-left"><i class="fa fa-chevron-left"></i></li>';
        }
        // regular page
        for (var i = 1; i <= numPages; i++) {
            if (i != curPage) {
                res += `<li class="page-item" data-value="${i}">${i}</li>`;
            } else {
                res += `<li class="active" data-value="${i}">${i}</li>`;
            }
        }
        // go-right button
        if (curPage >= numPages) {
            res += '<li class="disabled"><i class="fa fa-chevron-right"></i></li>';
        } else {
            res += '<li class="page-right"><i class="fa fa-chevron-right"></i></li>';
        }
        return res;
    }
});

Template.Pagination.events({
    'click .ec-pagination .page-item': (event, template) => {
        // Use aldeed:template-extension for the first time
        // This is the ReactiveVar page in the parent
        var page = template.parent(1).page;
        // @FIX: try to come up with a better solution
        var reqPage = event['toElement']['attributes'][1].value;
        page.set(reqPage);
    },
    'click .ec-pagination .page-left': (event, template) => {
        var page = template.parent(1).page;
        if (page.get() <= 1) {
            return;
        } else {
            page.set(page.get() - 1);
        }
    },
    'click .ec-pagination .page-right': (event, template) => {
        var page = template.parent(1).page;
        if (page.get() >= template.data.numPages) {
            return;
        } else {
            page.set(page.get() + 1);
        }
    }
});