# Selectively loads middleware required for OmniAuth
# for any path outside of the `/api` namespace.
class OmniauthStack
  def initialize(app)
    @app = app
  end

  def call(env)
    if skip?(env)
      @app.call(env)
    else
      middleware_stack.build(@app).call(env)
    end
  end

  def skip?(env)
    env["PATH_INFO"].start_with?("/api/")
  end

  private

  def middleware_stack
    @middleware_stack ||= build_middleware_stack
  end

  # rubocop:disable Metrics/AbcSize, Style/CharacterLiteral, Style/AlignParameters
  def build_middleware_stack
    session_store   = Rails.application.config.session_store
    session_options = Rails.application.config.session_options

    ActionDispatch::MiddlewareStack.new.tap do |middleware|
      middleware.use ActionDispatch::Cookies

      middleware.use session_store, session_options

      middleware.use OmniAuth::Builder do
        ManifoldEnv.oauth.enabled.each do |enabled_provider|
          provider(*enabled_provider.provider_args)
        end
      end
    end
  end
  # rubocop:enable Metrics/AbcSize, Style/CharacterLiteral, Style/AlignParameters
end
