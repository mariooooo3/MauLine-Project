package RateUpSystem;

public class RateUpSystem {
    private int communicationSkills;
    private int punctuality;
    private int professionalism;
    private int safety;
    private int respectfulness;
    private int cleanliness;

    public RateUpSystem(int communicationSkills, int punctuality, int professionalism,
                        int safety, int respectfulness, int cleanliness) {
        this.communicationSkills = communicationSkills;
        this.punctuality = punctuality;
        this.professionalism = professionalism;
        this.safety = safety;
        this.respectfulness = respectfulness;
        this.cleanliness = cleanliness;
    }

    public float getRating() {
        float getRating = 0;
        getRating = (float) (this.communicationSkills + this.punctuality + this.professionalism +
                this.safety + this.respectfulness + this.cleanliness) / 6;

        return getRating;
    }


    public static class RateBuilder {
        private int communicationSkills = 0;
        private int punctuality = 0;
        private int professionalism = 0;
        private int safety = 0;
        private int respectfulness = 0;
        private int cleanliness = 0;


        public RateBuilder() {

        }


        public RateBuilder communicationSkillsCount(int communicationSkills) {
            this.communicationSkills = communicationSkills;
            return this;
        }

        public RateBuilder punctualityCount(int punctuality) {
            this.punctuality = punctuality;
            return this;
        }

        public RateBuilder professionalismCount(int professionalism) {
            this.professionalism = professionalism;
            return this;
        }

        public RateBuilder safetyCount(int safety) {
            this.safety = safety;
            return this;
        }

        public RateBuilder respectfulness(int respectfulness) {
            this.respectfulness = respectfulness;
            return this;
        }

        public RateBuilder cleanlinessCount(int cleanliness) {
            this.cleanliness = cleanliness;
            return this;
        }

        public RateUpSystem build() {
            return new RateUpSystem(this);
        }
    }


    private RateUpSystem(RateBuilder builder) {
        this.communicationSkills = builder.communicationSkills;
        this.punctuality = builder.punctuality;
        this.professionalism = builder.professionalism;
        this.safety = builder.safety;
        this.respectfulness = builder.respectfulness;
        this.cleanliness = builder.cleanliness;

    }
}
