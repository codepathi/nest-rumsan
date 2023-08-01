<h2>Simple Role Based Access Control using Guards</h2> 

<h4>Roles</h4>
<ul>
  <li>Admin</li>
  <li>Moderator</li>
  <li>Client</li>
</ul>

<h4>Permissions available for roles</h4>
<ul>
  <li>Client: Client can only read the books.</li>
  <li>Moderator: Moderator can create, read, update and delete a book.</li>
  <li>Admin: Admin can do everything a moderator can do. In addition to that admin can also change role of other member.</li>
</ul>

<h3>Implementation</h3>
<ul>
  <li>Created a custom decorator to send metadata to role guard.</li>
  <li>RoleGuard uses metadata (gets permitted roles array) and compares it with user's role array. If user has the required role the guard allows execution, if not, the guard will restrict execution of the controller.</li>
</ul>

<h4>Next</h4>
<p>Implement RBAC using CASL.</p>
