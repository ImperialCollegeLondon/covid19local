$(function() {
  $(document.body).append(`
  <div class="modal fade" id="limitationsModal" tabindex="-1" role="dialog" aria-labelledby="limitationsModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="limitationsModalLabel">COVID-19 United Kingdom</h4>
      </div>
      <div class="modal-body">
        <ul>
         <li> This site gives estimates of the reproduction number of COVID-19 and projections of cases by Local Authority in the UK based on testing data and mortality data.</li>
         <li style="color:red;"> Lockdowns and other measures  are not an explicit part of the model; hence their effect may not appear for 1-2 weeks post the date of implementation.</li>
         <li> All estimates and projections have uncertainty/probability measures associated with them. Central estimates should be treated cautiously: look at the range.
          <li> Projections of cases assume that <strong>interventions (e.g. lockdowns, school closures) and behaviour patterns do not change</strong>. 
          <li> A statistical model is used to estimate quantities that cannot be directly measured, such as the reproduction number R. No model is perfect; see <strong>limitations</strong> in "Details".
          </li>
        </ul>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" onclick="disclaimerDismiss()">Close</button>
      </div>
    </div>
  </div>
</div>
  `);
  
  
    $('#limitationsModal').modal();
});
