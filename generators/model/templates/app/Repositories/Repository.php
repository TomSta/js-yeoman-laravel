<?php
namespace <%- namespace %>\Repositories;

use <%- namespace %>\<%- model %>;
use <%- namespace %>\interfaces\<%- model %>RepositoryInterface;

class <%- model %>Repository implements <%- model %>RepositoryInterface {

	public static function getAll(){
		return <%- model %>::all();
	}
	
}

?>
