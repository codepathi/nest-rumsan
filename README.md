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
  <li><b>For book restriction:</b> Created a custom guard that checks whether the logged in user is moderator or admin or not and return true only if they are moderator or admin.</li>
  <li><b>For changing role:</b> Created a custom guard that checks whether the logged in user is admin or not and return true only if they are admin.</li>
</ul>

<h4>Next</h4>
<p>Implement RBAC using CASL.</p>
