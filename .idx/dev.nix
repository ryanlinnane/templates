# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
    pkgs.silver-searcher
    pkgs.nixpacks
  ];
  # Sets environment variables in the workspace
  env = {
    VITE_REACT_APP_IDX_ENV = true;
  };
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
    ];
    workspace = {
      # Runs when a workspace is first created with this `dev.nix` file
      onCreate = {
        npm-install = "npm ci --no-audit --prefer-offline --no-progress --timing";
        # Open editors for the following files by default, if they exist:
        default.openFiles = [ "src/App.tsx" "src/App.ts" "src/App.jsx" "src/App.js" ];
      };
      # To run something each time the workspace is (re)started, use the `onStart` hook
      onStart = {
        npm-watch-be = "npm --prefix server run dev";
        setup-aliases = ''
          echo -e "alias ga='git add'" > /home/user/.bash_aliases
          echo -e "alias gcm='git commit --message'" >> /home/user/.bash_aliases
          echo -e "alias gs='git status'" >> /home/user/.bash_aliases
        '';
      };
    };
    # Enable previews and customize configuration
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["sh" "-c" "sleep 5 && npm --prefix ./client run dev -- --base /app  --port $PORT --host 0.0.0.0"];
          # command = ["npm" "--prefix" "./client" "run" "dev" "--" "--port" "$PORT" "--host" "0.0.0.0"];
          manager = "web";
        };
      };
    };
  };
}
