{
  # Nix: https://nixos.org/download.html
  # How to activate flakes: https://nixos.wiki/wiki/Flakes
  # For seamless integration, consider using:
  # - direnv: https://github.com/direnv/direnv
  # - nix-direnv: https://github.com/nix-community/nix-direnv
  #
  # # .envrc
  # use flake
  # dotenv .env
  #
  description = "Pathfinder desktop app development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    nixpkgs,
    flake-utils,
    ...
  }: let
    systems = flake-utils.lib.system;
  in
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = import nixpkgs {
        inherit system;
      };

      defaultShellConf = {
        nativeBuildInputs = with pkgs;
          [
            nodePackages.pnpm
            nodejs
            nodePackages.prettier
            nodePackages.typescript
            nodePackages.typescript-language-server

            # Rust
            rustup
            curl
            wget
            pkg-config
            libiconv
          ]
          ++ nixpkgs.lib.optional (system == systems.aarch64-darwin) [
            darwin.apple_sdk.frameworks.Security
            darwin.apple_sdk.frameworks.CoreServices
            darwin.apple_sdk.frameworks.CoreFoundation
            darwin.apple_sdk.frameworks.Foundation
            darwin.apple_sdk.frameworks.AppKit
            darwin.apple_sdk.frameworks.WebKit
            darwin.apple_sdk.frameworks.Cocoa
          ];

        shellHook = ''
          project_root="$(git rev-parse --show-toplevel 2>/dev/null || jj workspace root 2>/dev/null)"
          export CARGO_INSTALL_ROOT="$project_root/apps/desktop/.cargo";
          export PATH="$CARGO_INSTALL_ROOT/bin:$project_root/node_modules/.bin:$PATH";
        '';
      };
    in {
      devShells.default = pkgs.mkShell defaultShellConf;
    });
}
