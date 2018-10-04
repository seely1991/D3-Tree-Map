const width = 400;
const height = 400;

const xhr = new XMLHttpRequest();
xhr.open("GET", "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json")
xhr.send()
xhr.onload = function() {
	const json = JSON.parse(xhr.responseText);
	const root = d3.hierarchy(json);
	const treeMapLayout = d3.treemap();
	treeMapLayout.size([width,height]);
	root.sum((d) => d.value)
	treeMapLayout(root);

	const gNode = d3.select("body")
		.append("svg")
		.attr("id", "graph")
		.attr("width", width)
		.attr("height", height)
		.selectAll("g")
		.data(root.descendants())
		.enter()
		.append("g")
		.attr("transform", (d) => "translate(" + d.x0 + "," + d.y0 + ")");


		gNode.append("rect")
		.attr("height", (d) => d.y1 - d.y0)
		.attr("width", (d) => d.x1 - d.x0)
		.attr("fill", (d) => {
				switch (d.data.category) {
					case "Action":
						return "red"
						break
					case "Family":
						return "blue"
						break
					case "Comedy":
						return "orange"
						break
					case "Biography":
						return "teal"
						break
					case "Adventure":
						return "yellow"
						break
					case "Animation":
						return "purple"
						break
					case "Drama":
						return "green"
						break
				}
		})
		.attr("stroke", "white")
		.attr("class", "tile")
		.attr("data-name", (d) => d.data.name)
		.attr("data-category", (d) => {
			if (d.data.hasOwnProperty("category")) {return d.data.category}else{return d.data.name}
		})
		.attr("data-value", (d) => d.value)
		.on("mouseover", (d) => {
			const tooltip = document.getElementById("tooltip");
			tooltip.style.display = "inline-block";
			tooltip.style.top = event.pageY - 100 + "px";
			tooltip.style.left = event.pageX - 50 + "px";
			tooltip.innerHTML = "<p>" + d.data.name + "</p><p>" + d.data.category + "</p>";
			tooltip.setAttribute("data-value", d.data.value);
		})
		.on("mousemove", (d) => {
			const tooltip = document.getElementById("tooltip");
			tooltip.style.top = event.pageY - 100 + "px";
			tooltip.style.left = event.pageX -25 + "px";
		})
		.on("mouseout", (d) => {
			document.getElementById("tooltip").style.display = "none";
		})

	gNode.append("text")
		.text((d) => "")
		.attr("dx", 4)
		.attr("dy", 14);

	const legendData = [{name: "Action", color: "red"}, 
		{name: "Adventure", color: "yellow"}, 
		{name: "Animation", color: "purple"}, 
		{name: "Drama", color: "green"}, 
		{name: "Family", color: "blue"}, 
		{name: "Comedy", color: "orange"}, 
		{name: "Biography", color: "teal"}]

	const legend = d3.select("#legend")
		.append("svg")
		.attr("width", 321)
		.attr("height", 200)
		.selectAll("g")
		.data(legendData)
		.enter()
		.append("g")
		.attr("transform", (d, i) => "translate(" + 50 * i  + ", 0)");

	legend.append("rect")
		.attr("width", 20)
		.attr("height", 20)
		.attr("fill", (d) => d.color)
		.attr("stroke", "black")
		.attr("class", "legend-item")

	legend.append("text")
		.attr("dx", 23)
		.attr("transform", "rotate(90)")
		.text((d) => d.name)



}