// MAST update attempt

/* Project goals:
    Update MAST backend to Node.js
        -Header and Footer files to be more consistent across site
            (Current footer for Module Selection page does not point to production URLs)
    Update Look And Feel of the frontend (Maybe something a bit more purple and gold?)
    Update Module Selection page with iBooks column
    Other tasks as assigned by the COE Office of Assessment, Data Management, and Digital Learning
*/

/* MAST site Usage:
    The backend polls the /mast_update/modules/ directory for module catergories and 
    then polls its subdirectories as the module itself e.g.:
    
    /mast_update/modules/Catergory      <-- "Category" will appear on the module selection page in the Categories column.

    /mast_update/modules/Catergory/ModuleTitle/index.html  <-- "ModuleTitle" will appear in the Modules column (after
        a category has been selected).

    New categories and new modules can be placed in the modules directory at anytime and the back-end will
    update the Module selection page automatically. Please insure that modules are in some category folder.
    The backend will also poll for .ibooks files, so long as they are in a category folder.

    If any questions arise in regards to the functionality or usage of this site, please contact
    Harley Dickson at job_2614@hotmail.com or lottietomomo@gmail.com. 
*/

