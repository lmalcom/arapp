$(function(){
	var loader, monkey; 
	loader = new THREE.JSONLoader(); 
	loader.load('smallCity.js', function(obj){
		monkey = obj; 
		console.log('monkey is...', monkey); 
	})
	$('#xpos').on('change', function(event){
		if(ob = window.currentob){
			ob.position.x = event.target.value; 
		}
	});
	$('#ypos').on('change', function(event){
		if(ob = window.currentob){
			ob.position.y = event.target.value; 
		}
	});
	$('#zpos').on('change', function(event){
		if(ob = window.currentob){
			ob.position.z = event.target.value; 
		}
	});
	$('#color').on('change', function(event){ 
		if(ob = window.currentob){ 
			var val = event.target.value; 
			ob.material.color.setHex('0x' + val.slice(1, val.length)); 
		} 
	}); 
	$('button').on('mousedown', function(){ 
		if(marker = window.currentMarker){ 
			/*var material	= new THREE.MeshLambertMaterial({color: 0xFFFF00}); 
			var geometry	= (monkey)? monkey : new THREE.CubeGeometry(50,50,50); 
			var mesh		= new THREE.Mesh(geometry, material); 
			mesh.position.x	= 0; 
			mesh.position.y	= 0; 
			mesh.position.z	= 0; 
			mesh.doubleSided= true; 
			if(monkey){ 
				mesh.scale.x = 10; 
				mesh.scale.y = 10; 
				mesh.scale.z = 10; 
			} 
			marker.object3d.add(mesh);	
			window.currentob = mesh; */

			createCity(null, null, function(cityMesh){
				marker.object3d.add(cityMesh);	
				window.currentob = cityMesh; 
				alert('created the mesh!'); 
			});
		}		
	}); 
	$('button').on('touchstart', function(){
		if(marker = window.currentMarker){
			var material	= new THREE.MeshLambertMaterial({color: 0xFFFF00});
			var geometry	= new THREE.CubeGeometry(50,50,50);
			var mesh		= new THREE.Mesh(geometry, material);
			mesh.position.x	= 0;
			mesh.position.y	= 0;
			mesh.position.z	= 0;
			mesh.doubleSided= true;
			marker.object3d.add(mesh);	
			window.currentob = mesh; 
		}		
	}); 
})