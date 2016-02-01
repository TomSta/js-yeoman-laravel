<?php
namespace <%- namespace %>\Repositories;

use <%- namespace %>\<%- model %>;
use <%- namespace %>\interfaces\<%- model %>RepositoryInterface;

class <%- model %>Repository implements <%- model %>RepositoryInterface {

	public function getAll() {
		return <%- model %>::all();
	}

	public function getOne( $id ) {
		return <%- model %>::find( $id );
	}
	
	public function findOneBy( $criteria_array ) {
		return <%- model %>::where( $criteria_array )->first();

	};
	public function findAllBy( $criteria_array ) {
		return <%- model %>::where( $criteria_array )->get();
	};

}

?>
