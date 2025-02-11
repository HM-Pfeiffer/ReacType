const fs = require('fs');
const path = require('path');

// Read the tree structure from a file
data = `
.
├── ReacType
│   ├── CHANGE_LOG.md
│   ├── CODE_OF_CONDUCT.md
│   ├── Dockerfile
│   ├── Dockerrun.aws.json
│   ├── LICENSE.md
│   ├── Procfile
│   ├── README.md
│   ├── __tests__
│   │   ├── BottomTabs.test.tsx
│   │   ├── DragAndDrop.test.tsx
│   │   ├── NavBar.test.tsx
│   │   ├── componentReducer.test.ts
│   │   ├── contextReducer.test.js
│   │   ├── gql.projects.test.ts
│   │   ├── helper.test.tsx
│   │   ├── marketplace.test.tsx
│   │   ├── playwright
│   │   │   └── example.spec.ts
│   │   ├── projects.test.ts
│   │   ├── server.test.tsx
│   │   ├── signIn.test.tsx
│   │   ├── spec.ts
│   │   ├── stateManagementReducer.test.js
│   │   ├── tree.test.tsx
│   │   └── userAuth.test.ts
│   ├── amplify
│   │   ├── README.md
│   │   ├── backend
│   │   │   ├── auth
│   │   │   │   └── reactype24e8d371
│   │   │   │       └── cli-inputs.json
│   │   │   ├── backend-config.json
│   │   │   ├── storage
│   │   │   │   └── ReacTypeMktImg
│   │   │   │       └── cli-inputs.json
│   │   │   ├── tags.json
│   │   │   └── types
│   │   │       └── amplify-dependent-resources-ref.d.ts
│   │   ├── cli.json
│   │   └── hooks
│   │       └── README.md
│   ├── app
│   │   └── src
│   │       ├── Dashboard
│   │       │   ├── NavbarDash.tsx
│   │       │   ├── Project.tsx
│   │       │   ├── ProjectContainer.tsx
│   │       │   ├── gqlStrings.ts
│   │       │   └── styles.css
│   │       ├── components
│   │       │   ├── App.tsx
│   │       │   ├── ContextAPIManager
│   │       │   │   ├── AssignTab
│   │       │   │   │   ├── AssignContainer.tsx
│   │       │   │   │   └── components
│   │       │   │   │       ├── ComponentDropDrown.tsx
│   │       │   │   │       ├── ComponentTable.tsx
│   │       │   │   │       ├── ContextDropDown.tsx
│   │       │   │   │       └── ContextTable.tsx
│   │       │   │   ├── ContextManager.tsx
│   │       │   │   ├── CreateTab
│   │       │   │   │   ├── CreateContainer.tsx
│   │       │   │   │   └── components
│   │       │   │   │       ├── AddContextForm.tsx
│   │       │   │   │       ├── AddDataForm.tsx
│   │       │   │   │       └── DataTable.tsx
│   │       │   │   └── DisplayTab
│   │       │   │       └── DisplayContainer.tsx
│   │       │   ├── StateManagement
│   │       │   │   ├── CreateTab
│   │       │   │   │   ├── CreateContainer.tsx
│   │       │   │   │   └── components
│   │       │   │   │       ├── StatePropsPanel.tsx
│   │       │   │   │       ├── TableParentProps.tsx
│   │       │   │   │       ├── TablePassedInProps.tsx
│   │       │   │   │       └── TableStateProps.tsx
│   │       │   │   ├── DisplayTab
│   │       │   │   │   ├── DataTable.tsx
│   │       │   │   │   ├── DisplayContainer.tsx
│   │       │   │   │   ├── Tree.tsx
│   │       │   │   │   └── useResizeObserver.ts
│   │       │   │   └── StateManagement.tsx
│   │       │   ├── bottom
│   │       │   │   ├── BottomPanel.tsx
│   │       │   │   ├── BottomTabs.tsx
│   │       │   │   ├── ChatRoom.tsx
│   │       │   │   ├── CodePreview.tsx
│   │       │   │   ├── CreationPanel.tsx
│   │       │   │   ├── StylesEditor.tsx
│   │       │   │   ├── UseStateModal.tsx
│   │       │   │   ├── VideoMeeting.tsx
│   │       │   │   └── VideoMeetingControl.tsx
│   │       │   ├── form
│   │       │   │   └── Selector.tsx
│   │       │   ├── left
│   │       │   │   ├── ComponentDrag.tsx
│   │       │   │   ├── ComponentsContainer.tsx
│   │       │   │   ├── ContentArea.tsx
│   │       │   │   ├── DragDropPanel.tsx
│   │       │   │   ├── ElementsContainer.tsx
│   │       │   │   ├── HTMLItem.tsx
│   │       │   │   ├── HTMLPanel.tsx
│   │       │   │   ├── ProfilePage.tsx
│   │       │   │   ├── RoomsContainer.tsx
│   │       │   │   ├── Settings.tsx
│   │       │   │   └── Sidebar.tsx
│   │       │   ├── login
│   │       │   │   ├── FBPassWord.tsx
│   │       │   │   ├── SignIn.tsx
│   │       │   │   └── SignUp.tsx
│   │       │   ├── main
│   │       │   │   ├── AddLink.tsx
│   │       │   │   ├── AddRoute.tsx
│   │       │   │   ├── Arrow.tsx
│   │       │   │   ├── Canvas.tsx
│   │       │   │   ├── CanvasContainer.tsx
│   │       │   │   ├── DeleteButton.tsx
│   │       │   │   ├── DemoRender.tsx
│   │       │   │   ├── DirectChildComponent.tsx
│   │       │   │   ├── DirectChildHTML.tsx
│   │       │   │   ├── DirectChildHTMLNestable.tsx
│   │       │   │   ├── IndirectChild.tsx
│   │       │   │   ├── RouteLink.tsx
│   │       │   │   └── SeparatorChild.tsx
│   │       │   ├── marketplace
│   │       │   │   ├── MarketplaceCard.tsx
│   │       │   │   ├── MarketplaceCardContainer.tsx
│   │       │   │   └── Searchbar.tsx
│   │       │   ├── right
│   │       │   │   ├── ComponentPanel.tsx
│   │       │   │   ├── ComponentPanelItem.tsx
│   │       │   │   ├── ComponentPanelRoutingItem.tsx
│   │       │   │   ├── DeleteProjects.tsx
│   │       │   │   ├── ExportButton.tsx
│   │       │   │   ├── LoginButton.tsx
│   │       │   │   ├── OpenProjects.tsx
│   │       │   │   ├── ProjectManager.tsx
│   │       │   │   ├── SaveProjectButton.tsx
│   │       │   │   ├── SimpleModal.tsx
│   │       │   │   └── createModal.tsx
│   │       │   └── top
│   │       │       ├── NavBar.tsx
│   │       │       ├── NavBarButtons.tsx
│   │       │       ├── NewExportButton.tsx
│   │       │       └── PublishModal.tsx
│   │       ├── constants
│   │       │   ├── ErrorMessages.ts
│   │       │   ├── ItemTypes.ts
│   │       │   └── Styling.ts
│   │       ├── containers
│   │       │   ├── AppContainer.tsx
│   │       │   ├── CustomizationPanel.tsx
│   │       │   ├── LeftContainer.tsx
│   │       │   ├── MainContainer.tsx
│   │       │   └── MarketplaceContainer.tsx
│   │       ├── helperFunctions
│   │       │   ├── auth.ts
│   │       │   ├── changePositionValidation.ts
│   │       │   ├── cloneDeep.ts
│   │       │   ├── combineStyles.ts
│   │       │   ├── componentNestValidation.ts
│   │       │   ├── cssRefresh.tsx
│   │       │   ├── esbuildService.ts
│   │       │   ├── generateCode.ts
│   │       │   ├── manageSeparators.ts
│   │       │   ├── projectGetSaveDel.ts
│   │       │   ├── randomPassword.ts
│   │       │   ├── renderChildren.tsx
│   │       │   ├── socket.ts
│   │       │   └── zipFiles.ts
│   │       ├── index.tsx
│   │       ├── interfaces
│   │       │   ├── Interfaces.ts
│   │       │   ├── declarations.d.ts
│   │       │   └── global.ts
│   │       ├── plugins
│   │       │   ├── fetch-plugin.ts
│   │       │   └── unpkg-path-plugin.ts
│   │       ├── public
│   │       │   ├── ezgif.com-gif-maker.gif
│   │       │   ├── favicon-original.png
│   │       │   ├── icons
│   │       │   │   ├── mac
│   │       │   │   │   └── icon.icns
│   │       │   │   ├── png
│   │       │   │   │   ├── 128x128.png
│   │       │   │   │   ├── 24x24.png
│   │       │   │   │   ├── 256x256.png
│   │       │   │   │   ├── 32x32.png
│   │       │   │   │   ├── 48x48.png
│   │       │   │   │   ├── 512x512.png
│   │       │   │   │   ├── 64x64.png
│   │       │   │   │   └── 96x96.png
│   │       │   │   └── win
│   │       │   │       ├── dark-mode.ico
│   │       │   │       ├── favIcon.ico
│   │       │   │       ├── icon-original.ico
│   │       │   │       ├── image.png
│   │       │   │       ├── light-mode.ico
│   │       │   │       ├── logo-original.png
│   │       │   │       ├── logo-two.png
│   │       │   │       ├── logo.png
│   │       │   │       ├── reactTypeV20.ico
│   │       │   │       ├── scrollup.png
│   │       │   │       └── white-reactype-logo-1.psd
│   │       │   ├── index-prod.ejs
│   │       │   ├── index.ejs
│   │       │   └── styles
│   │       │       ├── globalDefaultStyles.ts
│   │       │       ├── style.css
│   │       │       └── theme.ts
│   │       ├── redux
│   │       │   ├── HTMLTypes.ts
│   │       │   ├── reducers
│   │       │   │   ├── rootReducer.ts
│   │       │   │   └── slice
│   │       │   │       ├── appStateSlice.ts
│   │       │   │       ├── codePreviewSlice.ts
│   │       │   │       ├── contextReducer.ts
│   │       │   │       ├── roomSlice.ts
│   │       │   │       └── styleSlice.ts
│   │       │   └── store.ts
│   │       ├── serverConfig.js
│   │       ├── tree
│   │       │   ├── TreeChart.tsx
│   │       │   └── useResizeObserver.ts
│   │       ├── tutorial
│   │       │   ├── CSSEditor.tsx
│   │       │   ├── Canvas.tsx
│   │       │   ├── CodePreview.tsx
│   │       │   ├── ComponentTree.tsx
│   │       │   ├── Customization.tsx
│   │       │   ├── HtmlElements.tsx
│   │       │   ├── KeyboardShortcuts.tsx
│   │       │   ├── Pages.tsx
│   │       │   ├── ReusableComponents.tsx
│   │       │   ├── RouteLinks.tsx
│   │       │   ├── States.tsx
│   │       │   ├── Styling.tsx
│   │       │   ├── Tutorial.tsx
│   │       │   └── TutorialPage.tsx
│   │       └── utils
│   │           ├── createApplication.util.ts
│   │           ├── createFiles.util.ts
│   │           ├── createGatsbyApp.util.ts
│   │           ├── createGatsbyFiles.util.ts
│   │           ├── createNextApp.util.ts
│   │           ├── createNextFiles.util.ts
│   │           ├── createNonce.ts
│   │           ├── createTestSuite.util.ts
│   │           ├── createTestSuiteClassic.util.ts
│   │           ├── createTestSuiteNext.util.ts
│   │           └── exportProject.util.ts
│   ├── config.js
│   ├── contributors.md
│   ├── electron-builder.yml
│   ├── index.html
│   ├── mockData.ts
│   ├── package-lock.json
│   ├── package.json
│   ├── playwright.config.ts
│   ├── prettierrc.json
│   ├── reactypeserverlogo.png
│   ├── resources
│   │   ├── ReadMe.gif
│   │   ├── annotations_tutorial_images
│   │   │   ├── Annotation.gif
│   │   │   └── NoteButton.gif
│   │   ├── canvasDemoV20.gif
│   │   ├── canvas_tutorial_images
│   │   │   ├── canvas1.png
│   │   │   ├── drag1.gif
│   │   │   ├── drag1.png
│   │   │   └── undoRedo.gif
│   │   ├── code_preview_images
│   │   │   └── CodePreview.png
│   │   ├── csseditor_tutorial_images
│   │   │   ├── CSSEditorTab.png
│   │   │   ├── CopyPasteCSS.gif
│   │   │   └── DirectCSSEdit.gif
│   │   ├── customizing_elements_images
│   │   │   ├── BackgroundColor.png
│   │   │   ├── CSS.png
│   │   │   ├── CodeChange.png
│   │   │   ├── Display.png
│   │   │   ├── Flex.png
│   │   │   ├── Height.png
│   │   │   ├── Lighting.png
│   │   │   ├── Resize.gif
│   │   │   ├── Resize.png
│   │   │   ├── Theme.png
│   │   │   ├── Width.png
│   │   │   ├── linkState.png
│   │   │   ├── text.gif
│   │   │   └── textState.png
│   │   ├── demo.gif
│   │   ├── demo19.gif
│   │   ├── export_tests_images
│   │   │   └── export-new.gif
│   │   ├── html_elements_tutorial_images
│   │   │   ├── codeSnippet.png
│   │   │   ├── createNew.png
│   │   │   ├── defaultElements.png
│   │   │   └── newTag.png
│   │   ├── icon.icns
│   │   ├── icon.ico
│   │   ├── icon.png
│   │   ├── marketplace_images
│   │   │   ├── marketplace_avatar.png
│   │   │   └── marketplace_image.png
│   │   ├── pages_images
│   │   │   ├── AddElements.png
│   │   │   ├── DeletePage.png
│   │   │   ├── Pages.png
│   │   │   ├── Pages1.png
│   │   │   ├── PagesPanel.png
│   │   │   ├── PagesSwapping.gif
│   │   │   └── Toggle.png
│   │   ├── reactype17.png
│   │   ├── reactype19.png
│   │   ├── readme.png
│   │   ├── reusable_components_tutorial_images
│   │   │   ├── reusablecomponents1.png
│   │   │   ├── reusablecomponents2.png
│   │   │   └── reusablecomponents3.png
│   │   ├── route_links_tutorial_images
│   │   │   ├── links-canvas.PNG
│   │   │   ├── links1.PNG
│   │   │   ├── links2.PNG
│   │   │   ├── links3.PNG
│   │   │   ├── links4.PNG
│   │   │   ├── links5.PNG
│   │   │   └── links6.PNG
│   │   ├── state_tutorial_images
│   │   │   ├── CodePreview.png
│   │   │   ├── CodePreview2.png
│   │   │   ├── CreateState.png
│   │   │   ├── DeleteState.gif
│   │   │   ├── StateTable.png
│   │   │   ├── delete.gif
│   │   │   ├── display.gif
│   │   │   ├── fullStateManageTab.png
│   │   │   ├── table1.gif
│   │   │   └── table3.gif
│   │   ├── tree_tutorial_images
│   │   │   ├── tree1.png
│   │   │   ├── tree2.png
│   │   │   ├── tree3.png
│   │   │   ├── tree4.png
│   │   │   └── tree5.png
│   │   ├── v19 collab room.png
│   │   ├── v19filestructure.png
│   │   ├── v20 collab room.png
│   │   └── v20 empty canvas.png
│   ├── server
│   │   ├── README.md
│   │   ├── assets
│   │   │   └── renderDemo.css
│   │   ├── controllers
│   │   │   ├── cookieController.ts
│   │   │   ├── marketplaceController.ts
│   │   │   ├── projectController.ts
│   │   │   ├── sessionController.ts
│   │   │   ├── userController.ts
│   │   │   └── userStylesController.ts
│   │   ├── graphQL
│   │   │   ├── resolvers
│   │   │   │   ├── mutation.ts
│   │   │   │   └── query.ts
│   │   │   └── schema
│   │   │       └── typeDefs.ts
│   │   ├── interfaces.ts
│   │   ├── models
│   │   │   ├── Oauth-model.ts
│   │   │   └── reactypeModels.ts
│   │   ├── routers
│   │   │   ├── auth.ts
│   │   │   ├── passport-setup.ts
│   │   │   └── stylesRouter.ts
│   │   ├── server.ts
│   │   └── tsconfig.json
│   ├── src
│   │   └── custom-aws-exports.js
│   ├── tsconfig.json
│   ├── tslint.json
│   ├── vite.config.ts
│   ├── webpack.config.js
│   ├── webpack.development.js
│   └── webpack.production.js
├── package-lock.json
└── project_tree.txt
`;

function convertToDot(tree) {
  const lines = tree.split('\n');
  let dot = 'digraph G {\n';
  const nodeStack = [];
  lines.forEach((line, index) => {
    if (line.trim()) {
      // Match spaces at the beginning of the line
      const depth = line.search(/\S|$/);
      // Split the line by spaces and take the last part as the name
      const parts = line.trim().split(/ +/);
      const name = parts[parts.length - 1];

      // Convert any non-alphanumeric characters to underscores for DOT compatibility
      const nodeName = name.replace(/[^a-zA-Z0-9]/g, '_');

      // Adjust the stack based on current depth
      while (
        nodeStack.length > 0 &&
        nodeStack[nodeStack.length - 1].depth >= depth
      ) {
        nodeStack.pop();
      }

      if (nodeStack.length > 0) {
        // Connect the current node to its parent
        dot += `  "${
          nodeStack[nodeStack.length - 1].name
        }" -> "${nodeName}";\n`;
      }

      // Push the current node and its depth onto the stack
      nodeStack.push({ name: nodeName, depth: depth });
    }
  });

  dot += '}\n';
  return dot;
}

const dotGraph = convertToDot(data);
console.log(dotGraph); // Debug output to see what's being generated

// Write the output to a DOT file
fs.writeFile(path.join(__dirname, 'output.dot'), dotGraph, (err) => {
  if (err) {
    console.error('Failed to write DOT file:', err);
    return;
  }
  console.log('DOT file has been created successfully!');
});
