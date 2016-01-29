<?php
namespace <%- namespace %>\Interfaces;

interface <%- model %>RepositoryInterface{

	public function getAll();
	public function getOne($id);
	public function findOneBy($criteria);
	public function findAllBy($criteria);
}

?>
