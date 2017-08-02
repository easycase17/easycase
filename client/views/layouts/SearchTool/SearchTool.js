Template.SearchTool.onCreated(function() {
    var self = this;
    self.searchRule = new ReactiveVar( Object );
    self.searchTypes = new ReactiveVar( Array );
    self.searchOptions = new ReactiveVar( Array );
    self.searchTypes.set(['Time']);

    self.autorun(function() {
        var types = self.searchTypes.get();
        self.searchOptions.set([]);
        types.forEach(function(type) {
            var option = {
                params: {
                    field: 'search' + type
                }
            };
            Meteor.call('options.getOptions', option, (err, res) =>  {
                var tmpOpt = self.searchOptions.get();
                tmpOpt.push({ type: type, options: res })
                self.searchOptions.set(tmpOpt);
            });
        });
    });
});

Template.SearchTool.helpers({
    searchTypes: () => {
        return Template.instance().searchTypes.get();
    },
    searchOptions: (type) => {
        var options = Template.instance().searchOptions.get();
        var option = options.find((i) => {
            return i.type === type;
        });
        // @TODO there is an error when rendering the page
        return option.options;
    }
});

Template.SearchTool.events({
    'click .search-tool-btn': (event, template) => {
        $('.search-tool-info').slideToggle();
        $('.search-tool-search').slideToggle();
    }
});

Template.SearchToolOption.events({
    'click .dropdown-item': (event, template) => {
        console.log(template);
    }
});