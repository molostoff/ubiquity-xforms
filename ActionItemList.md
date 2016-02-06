**Paul** will work on a few remaining issues for select1 needed for the loan form, then merge results to trunk.  The remainder of select1 work should be entered as issues and solved on other branches in the future.

_Note:_ Advise branch merge after alert merge from Mark McEntee and calendar control merge from Rahul. If those merges are not done before Tuesday Aug. 19, then other team members must assume you will grab the merge token during normal work time in UK on Aug. 19.  Please notify group if your merge will be later than that.

**Merle** will investigate Ajaxslt failures in XPath expressions that are preventing proper operation of the calculations and constraints in the loan form.  This may involve upgrading the Ajaxslt processor.

_Note:_ Paul advises that you need to preserve modifications that had to be made for the dependency system.

_Note:_ John advises that you need to ensure the license is still BSD before upgrading.  Otherwise, we may have to repair the one we have.

**Mark McEntee** will perform the following tasks:
  1. Make alert text red by default.
  1. Move alert text to after the control by default
  1. Remove "temporary" fix that blanks alert inline text when there is a UI binding
  1. File a new issue that some elements (like alert) do not blank inline text when there is a UI binding (set priority to low, and no iteration number)
  1. File a future issue that requests the ability to style an alert so that it appears as a tooltip rather than inline.  Indicate that this is needed so that alerts can be used without affecting form layout. Set medium priority and no iteration number
  1. Merge resulting alert work to trunk.  This needs to be done no later than close of business Friday.  Please notify group if you will be late, esp. Rahul and Paul

**Rahul** will perform the following tasks:
  1. Let datatype="xf:date" and datatype="date" also work to select calendar picker **done**
  1. Let appearance="minimal" and any date datatype choose plaintext field **done**
  1. Let appearance="compact" and any date datatype choose popup calendar style **done**
  1. Let appearance="full" and any date datatype choose calendar widget **done**
  1. Change name of g\_loadCustomControls to more clearly signify that it is a temporary flag that will no-op in the future when loading is optimized. **done**
  1. Enter future issue that suggests model needs to project type info into UI control's datatype, if type info is available. **done**
  1. After above, merge calendar and colorpicker work to trunk.  This needs to be done by close of business Monday Aug. 18.  Assume merge will happen after Mark McEntee's alert work.  If you are ready to go first, coordinate with Mark.  If you will be late, please notify group, as Paul may be able to merge select1 work.

**Team**: Need to rally around Merle to see what can be done to repair deficiencies in Ajaxslt processor, esp. problems with math operators.  We may have to code these ourselves if they will not be available very soon in Ajaxslt.