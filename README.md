# Important Notes

## Softwares Must be Installed

- IDE `VScode recommended`
- NodeJs
- NPM `Installed with NodeJs`
- Angular `Install it Globaly By NPM`
- TypeScript `Install it Globaly By NPM`
- Packages In package.json `Install it By NPM`
- GIT

## Shell Commands

##### Install Angular
```bash
npm install -g @angular/cli
```
##### Install Typescript 
```bash
npm install -g typescript
```
##### Install Packages 
```bash
cd dir-to-project & npm install
```

***
***

# Important Files

this is the important Files u will need if u want to edit something

## Service Files

### API Service File

- **Path:** `src/app/core/service/API`
- Contain the [Backend](http://localhost:3002/api/) Host Url there

### APIs Endpoints Modules

- **Path:** `src/app/core/modules`
- Contain (Models, Services) To get data From Backend
- Organized be Endpoints

### Cache Service File

- **Path:** `src/app/core/cache`
- Contain Functions Control Cache Logic

### Authantication Service File

- **Path:** `src/app/core/service/auth`
- Contain Functions That control User Session and his Stored Data

### Permissions Service File

- **Path:** `src/app/core/service/auth/permission`
- To control users permissions
- **Note:** Permissions logic is similar to linux permissions `chmod -options`

### Helper Service File 

- **Path:** `src/app/core/service/utils/helper`
- Contain Useful Functions

### Paginatation Service File

- **Path:** `src/app/core/service/utils/paginator`
- Contain Functions that control table paginatation

***
***


&nbsp;# FileExchangeFrontEnd
