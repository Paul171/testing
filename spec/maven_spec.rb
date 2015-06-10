require_relative 'spec_helper'

describe "Maven" do

  context "on jdk-1.8" do
    let(:app) { Hatchet::Runner.new("java-servlets-sample") }
    let(:jdk_version) { "1.8" }

    it "should upgrade and downgrade successfully" do
      Dir.chdir(app.directory) do
        set_java_and_maven_versions(jdk_version, "3.0.5")
      end

      app.deploy do |app|
        expect(app.output).to include("Installing Maven 3.0.5")
        expect(app.output).to include("BUILD SUCCESS")
        expect(successful_body(app)).to eq("Hello from Java!")

        set_java_and_maven_versions(jdk_version, "3.2.3")

        app.push!
        expect(app.output).to include("Installing Maven 3.2.3")
        expect(app.output).to include("BUILD SUCCESS")
        expect(successful_body(app)).to eq("Hello from Java!")

        set_java_and_maven_versions(jdk_version, "3.2.5")

        app.push!
        expect(app.output).to include("Installing Maven 3.2.5")
        expect(app.output).to include("BUILD SUCCESS")
        expect(successful_body(app)).to eq("Hello from Java!")

        set_java_and_maven_versions(jdk_version, "3.1.1")

        app.push!
        expect(app.output).to include("Installing Maven 3.1.1")
        expect(app.output).to include("BUILD SUCCESS")
        expect(successful_body(app)).to eq("Hello from Java!")
      end
    end
  end
end
