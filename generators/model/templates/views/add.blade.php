@if(session('status'))
{{ session('status') }}
@endIf

<div class="row">
    <div class="panel panel-success col-md-6 col-md-offset-3">
        <div class="panel-body">
          <form class="form-horizontal" action="<%- name.toLowerCase() %>/create">
	  {{ method_field('POST') }}
	  <input type="hidden" name="_token" value="{{ csrf_token() }}">
<%- fields %>
	  @include('formfields.submit', 
		  ['title' => '<%- name %>!', 'name' => 'submit' ])
          </form>
        </div>
    </div>
  </div>
</div>

