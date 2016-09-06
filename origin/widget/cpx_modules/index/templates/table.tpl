<ul>
	<% _.each(list, function(obj, index) { %>
		<li><%= obj.name %></li>
	<% }); %>
</ul>