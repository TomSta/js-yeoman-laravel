@if(session('status'))
{{ session('status') }}
@endIf

<div class="row">
    <div class="panel panel-success col-md-6 col-md-offset-3">
      <div class="panel-heading">Create <%- name %></div>
        <div class="panel-body">
          <form class="form-horizontal" action="">
	  {{ method_field('PUT') }}
	  <input type="hidden" name="_token" value="{{ csrf_token() }}">
<%- fields %>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

