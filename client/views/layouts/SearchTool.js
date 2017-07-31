Template.SearchTool.events({
    'click .search-tool-btn': (event, template) => {
        $('.search-tool-info').slideToggle();
        $('.search-tool-search').slideToggle();
    }
});