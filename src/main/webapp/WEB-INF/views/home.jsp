<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html>
<head>
	<title>HSBC Home</title>
</head>
<body>
	<div>
		<h2>A list of spittles</h2>
		<ol>
			<c:forEach var="spittle" items="${spittles}">
				<li>${spittle.id} : ${spittle.name}</li>
			</c:forEach>
		</ol>
	</div>
	<div>
		<div>Some simple math: ${2+2}</div>
		<br/>
		<div>Some simple math with c:out: <c:out value="${2+2}"/></div>
		<br/>
	</div>
</body>
</html>
