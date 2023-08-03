<h4>RBAC using CASL</h4>
<p>Roles and permission as in RBAC using guards.</p>

<h4>CASL implementation</h4>
<ul>
  <li>Created ability.factory which contains logic about what a user can do with a certain role.</li>
  <li>Create ability.guard which takes parameter from controller through a custom ability.decorator.</li>
  <li>Guard returns true if there is no ForbiddenError, else throws an error message.</li>
</ul>

